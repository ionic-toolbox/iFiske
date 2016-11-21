angular.module('ifiske.models')
.provider('Admin', function() {
    this.$get = function($q, API, Organization, Product) {
        var organizations = {};

        function initOrg(org) {
            Organization.getOne(org.orgid).then(function(o) {
                org.info = o;
            });
            return API.adm_products(org.orgid).then(function(products) {
                var prods = [];
                for (var j in products) {
                    products[j].validity = Product.getValidity(products[j]);
                    prods.push(products[j]);
                }
                org.products = prods;
            });
        }
        var model = {
            isAdmin: function() {
                return API.user_organizations().then(function(orgs) {
                    console.log(orgs);
                    for (var i in orgs) {
                        return orgs[i].orgid;
                    }
                    return false;
                });
            },
            checkProduct: function(code) {
                return API.adm_check_prod(code);
            },
            revokeProduct: function(product) {
                return API.adm_revoke_prod(product.code, 1);
            },
            getProduct: function(orgID, productID) {
                var product;
                try {
                    product = organizations[orgID].products.filter(function(p) {
                        return Number(p.ID) === Number(productID);
                    })[0];
                } catch (e) {
                }
                if (product) {
                    return $q.resolve(product);
                }

                return model.wait.then(function() {
                    var product;
                    try {
                        product = organizations[orgID].products.filter(function(p) {
                            return Number(p.ID) === Number(productID);
                        })[0];
                    } catch (e) {
                    }
                    if (product) {
                        return product;
                    }
                    return $q.reject('Could not find a product');
                });
            },
            getOrganization: function(orgID) {
                return model.wait.then(function() {
                    return organizations[orgID];
                });
            },
            getOrganizations: function() {
                return API.user_organizations().then(function(orgs) {
                    var p = [];
                    for (var i in orgs) {
                        console.log(i, organizations, orgs);
                        organizations[i] = orgs[i];
                        p.push(initOrg(organizations[i]));
                    }
                    return $q.all(p).then(function() {
                        return orgs;
                    });
                });
            },
            getProducts: function(orgID) {
                return model.wait.then(function() {
                    console.log('orgs is', organizations, orgID, organizations[orgID]);
                    return organizations[orgID].products;
                });
            },
        };
        model.wait = model.getOrganizations();

        return model;
    };
});
