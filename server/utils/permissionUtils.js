const DEFAULT_PERMISSION = [
    {
        "module": "PII",
        "hasAccess": false,
        "permissions": [
            {
                "label": "PII : read",
                "hasAccess": false
            }
        ]
    },
    {
        "module": "Region",
        "hasAccess": false,
        "permissions": [
            {
                "label": "US : read",
                "hasAccess": false
            },
            {
                "label": "EU : read",
                "hasAccess": false
            }
        ]
    },
    {
        "module": "Tracking",
        "hasAccess": false,
        "permissions": [
            {
                "label": "Tracking : read",
                "hasAccess": false
            },
            {
                "label": "Tracking : write",
                "hasAccess": false
            },
            {
                "label": "Tracking : sign",
                "hasAccess": false
            },
            {
                "label": "Tracking : print",
                "hasAccess": false
            }
        ]
    },
    {
        "module": "Reporting",
        "hasAccess": false,
        "permissions": [
            {
                "label": "Reporting : read",
                "hasAccess": false
            },
            {
                "label": "Reporting : write",
                "hasAccess": false
            }
        ]
    },
    {
        "module": "Monitoring",
        "hasAccess": false,
        "permissions": [
            {
                "label": "Monitoring : read",
                "hasAccess": false
            },
            {
                "label": "Monitoring : write",
                "hasAccess": false
            }
        ]
    },
    {
        "module": "Configuration and Settings",
        "hasAccess": false,
        "permissions": [
            {
                "label": "Settings : read",
                "hasAccess": false
            },
            {
                "label": "Settings : write",
                "hasAccess": false
            },
            {
                "label": "Certificate Management : read",
                "hasAccess": false
            },
            {
                "label": "Certificate Management : write",
                "hasAccess": false
            },
            {
                "label": "Audit Logs : read",
                "hasAccess": false
            },
            {
                "label": "Audit Logs : write",
                "hasAccess": false
            }
        ]
    },
];

// ***************  ROLES FOR DEV  **************

const DEV_CARTREADONLYUS = {
    "name": "JAN-APP-ATARA-DEV-CARTREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTREADONLYEU = {
    "name": "JAN-APP-ATARA-DEV-CARTREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTPIIREADONLYUS = {
    "name": "JAN-APP-ATARA-DEV-CARTPIIREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTPIIREADONLYEU = {
    "name": "JAN-APP-ATARA-DEV-CARTPIIREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_SYSTEMADMIN = {
    "name": "JAN-APP-ATARA-DEV-SYSTEMADMIN",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": true
                }
            ]
        },
    ]
};

const DEV_CARTADMINUS = {
    "name": "JAN-APP-ATARA-DEV-CARTADMINUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTADMINEU = {
    "name": "JAN-APP-ATARA-DEV-CARTADMINEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTWRITEUS = {
    "name": "JAN-APP-ATARA-DEV-CARTWRITEUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const DEV_CARTWRITEEU = {
    "name": "JAN-APP-ATARA-DEV-CARTWRITEEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

// ***************  ROLES FOR QA  **************

const QA_CARTREADONLYUS = {
    "name": "JAN-APP-ATARA-QA-CARTREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTREADONLYEU = {
    "name": "JAN-APP-ATARA-QA-CARTREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTPIIREADONLYUS = {
    "name": "JAN-APP-ATARA-QA-CARTPIIREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTPIIREADONLYEU = {
    "name": "JAN-APP-ATARA-QA-CARTPIIREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_SYSTEMADMIN = {
    "name": "JAN-APP-ATARA-QA-SYSTEMADMIN",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": true
                }
            ]
        },
    ]
};

const QA_CARTADMINUS = {
    "name": "JAN-APP-ATARA-QA-CARTADMINUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTADMINEU = {
    "name": "JAN-APP-ATARA-QA-CARTADMINEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTWRITEUS = {
    "name": "JAN-APP-ATARA-QA-CARTWRITEUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const QA_CARTWRITEEU = {
    "name": "JAN-APP-ATARA-QA-CARTWRITEEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};


// ***************  ROLES FOR PROD  **************

const PROD_CARTREADONLYUS = {
    "name": "JAN-APP-ATARA-PROD-CARTREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTREADONLYEU = {
    "name": "JAN-APP-ATARA-PROD-CARTREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTPIIREADONLYUS = {
    "name": "JAN-APP-ATARA-PROD-CARTPIIREADONLYUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTPIIREADONLYEU = {
    "name": "JAN-APP-ATARA-PROD-CARTPIIREADONLYEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_SYSTEMADMIN = {
    "name": "JAN-APP-ATARA-PROD-SYSTEMADMIN",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": false
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": true
                }
            ]
        },
    ]
};

const PROD_CARTADMINUS = {
    "name": "JAN-APP-ATARA-PROD-CARTADMINUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTADMINEU = {
    "name": "JAN-APP-ATARA-PROD-CARTADMINEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": true
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": true
                },
                {
                    "label": "Settings : write",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": true
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": true
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTWRITEUS = {
    "name": "JAN-APP-ATARA-PROD-CARTWRITEUS",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": true
                },
                {
                    "label": "EU : read",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const PROD_CARTWRITEEU = {
    "name": "JAN-APP-ATARA-PROD-CARTWRITEEU",
    "permissionList": [
        {
            "module": "PII",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "PII : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Region",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "US : read",
                    "hasAccess": false
                },
                {
                    "label": "EU : read",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Tracking",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Tracking : read",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : write",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : sign",
                    "hasAccess": true
                },
                {
                    "label": "Tracking : print",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Reporting",
            "hasAccess": true,
            "permissions": [
                {
                    "label": "Reporting : read",
                    "hasAccess": true
                },
                {
                    "label": "Reporting : write",
                    "hasAccess": true
                }
            ]
        },
        {
            "module": "Monitoring",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Monitoring : read",
                    "hasAccess": false
                },
                {
                    "label": "Monitoring : write",
                    "hasAccess": false
                }
            ]
        },
        {
            "module": "Configuration and Settings",
            "hasAccess": false,
            "permissions": [
                {
                    "label": "Settings : read",
                    "hasAccess": false
                },
                {
                    "label": "Settings : write",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : read",
                    "hasAccess": false
                },
                {
                    "label": "Certificate Management : write",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : read",
                    "hasAccess": false
                },
                {
                    "label": "Audit Logs : write",
                    "hasAccess": false
                }
            ]
        },
    ]
};

const ALL_DEV_ROLES = [
    // read only role
    DEV_CARTREADONLYUS,
    DEV_CARTREADONLYEU,

    // pii read only role
    DEV_CARTPIIREADONLYUS,
    DEV_CARTPIIREADONLYEU,

    // functional admin
    DEV_CARTADMINUS,
    DEV_CARTADMINEU,
    DEV_CARTWRITEUS,
    DEV_CARTWRITEEU,

    // sys admin
    DEV_SYSTEMADMIN,
];

const ALL_QA_ROLES = [
    // read only role
    QA_CARTREADONLYUS,
    QA_CARTREADONLYEU,

    // pii read only role
    QA_CARTPIIREADONLYUS,
    QA_CARTPIIREADONLYEU,

    // functional admin
    QA_CARTADMINUS,
    QA_CARTADMINEU,
    QA_CARTWRITEUS,
    QA_CARTWRITEEU,

    // sys admin
    QA_SYSTEMADMIN,
];

const ALL_PROD_ROLES = [
    // read only role
    PROD_CARTREADONLYUS,
    PROD_CARTREADONLYEU,

    // pii read only role
    PROD_CARTPIIREADONLYUS,
    PROD_CARTPIIREADONLYEU,

    // functional admin
    PROD_CARTADMINUS,
    PROD_CARTADMINEU,
    PROD_CARTWRITEUS,
    PROD_CARTWRITEEU,

    // sys admin
    PROD_SYSTEMADMIN,
];

let PERMISSION_CONST = [];
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "DEVELOPMENT") {
    PERMISSION_CONST = ALL_DEV_ROLES;
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "QA") {
    PERMISSION_CONST = ALL_QA_ROLES;
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "PRODUCTION") {
    PERMISSION_CONST = ALL_PROD_ROLES;
}

const PERMISSION_MODULES = {
    PII: "PII",
    REGION: "Region",
    TRACKING: "Tracking",
    REPORTING: "Reporting",
    MONITORING: "Monitoring",
    CONFIGURATION_SETTINGS: "Configuration and Settings",
};

const PERMISSION_LIST = {
    PII_READ: "PII : read",
    REGION_US: "US : read",
    REGION_EU: "EU : read",
    TRACKING_READ: "Tracking : read",
    TRACKING_WRITE: "Tracking : write",
    TRACKING_SIGN: "Tracking : sign",
    TRACKING_PRINT: "Tracking : print",
    REPORTING_READ: "Reporting : read",
    REPORTING_WRITE: "Reporting : write",
    MONITORING_READ: "Monitoring : read",
    MONITORING_WRITE: "Monitoring : write",
    CONFIGURATION_SETTINGS_READ: "Settings : read",
    CONFIGURATION_SETTINGS_WRITE: "Settings : write",
    CONFIGURATION_CERTIFICATE_MANAGEMENT_READ: "Certificate Management : read",
    CONFIGURATION_CERTIFICATE_MANAGEMENT_WRITE: "Certificate Management : write",
    CONFIGURATION_AUDIT_LOGS_READ: "Audit Logs : read",
    CONFIGURATION_AUDIT_LOGS_WRITE: "Audit Logs : write",
};

module.exports = { DEFAULT_PERMISSION, PERMISSION_CONST, PERMISSION_LIST, PERMISSION_MODULES };