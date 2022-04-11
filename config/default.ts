export default {
    db : {
        port: 3306,
        host: "127.0.0.1",
        user: "root",
        password: "Password#1",
        database: " stackerflow",
        connectionLimit: 4,
        
    },

    server: {
        port: 1336,
        host: "localhost",
    },

    security:{
        saltWorkFactor: 5,
privateKey: 
`-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgGA8BTJ6gqmxDAOoiANV5nI8yXEjnSLy4wxmoXo9E5kfQGDOOSFK
P5rIgdXPP9eBWwMXvYLflqDch72tm8stVq7a1pOgpoHc7ySE9UEWUR3O+xN2O8eX
iwWfyYsJID8iQjG0S2a/Wio1OMBnKw7W9P+E61jlgcBNQHI/bF6nIQT/AgMBAAEC
gYAbAVzYAIcgRX3AnQ+mF/n2PtasuDjFcPGELlzMJ82TH7D6OYTQsbxNnEzLCkC5
IiS/Jm9ZBZOIirpQ4SIiDxQO3icxkcdPEwHiM5LNsjQaY1uqch+xT77yHZyRmTfD
gkV+6cW1ak6PRzFr/GvF8mkROpnVRrFsLtahq+4uF2W2cQJBALmY70BeB15qCa6q
mpyUlV8luU8rx9D8avTPjAsgn8c4ELbT941gvmJoME0hcqQ62zG/bD3FGvtyJPFj
ChFPXpkCQQCEvTGNN9UYGSdJ+ruQYwizrZJraDQCvi8kp4Scn8YxB4X2AsFraHAS
jtEjL60CwlTwCJVphPRE8k43OU/UnTdXAkAluuRwdm0TEYV0X7Rcvov7MsUQRjsx
zg7EQ+kZXgF9U3V6ZW7+67rocHvZQkJ3BowG+f48NHS+xz6hX9vtFvCJAkAufsbY
nHH8GvN0KmuAy+/EYEwlaz6sp0mEIVmGM0EM84GtBpIRuWdoWLZRCOYlTUTLP3Z2
m6ekbuuO1HhuFRPJAkA23zfPNDIIKz/HzTgVqSnE4MCMRrhtVk5NrgRl1tEkfNVV
3j8TIOedDow4BRHFvJJRSU8pfGsfswLgnfjocAaF
-----END RSA PRIVATE KEY-----`,
publicKey: 
`-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGA8BTJ6gqmxDAOoiANV5nI8yXEj
nSLy4wxmoXo9E5kfQGDOOSFKP5rIgdXPP9eBWwMXvYLflqDch72tm8stVq7a1pOg
poHc7ySE9UEWUR3O+xN2O8eXiwWfyYsJID8iQjG0S2a/Wio1OMBnKw7W9P+E61jl
gcBNQHI/bF6nIQT/AgMBAAE=
-----END PUBLIC KEY-----`,
        accessTokenTtl: "30m",
        refreshTokenTtl: "30m",
    },

    cors: {
        exposedHeaders: ["x-access-token"],
    }
}

