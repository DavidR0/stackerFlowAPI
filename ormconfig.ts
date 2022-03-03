export default {
    type: "mysql",
    name: "default",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password#1",
    database: "stackerflow",
    synchronize: false,
    "entities": [
      "src/entities/*.ts"
  ]
}
