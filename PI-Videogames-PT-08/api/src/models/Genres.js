const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genres", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID, //UUID es un tipo de dato que genera un id unico
      defaultValue: DataTypes.UUIDV4, //UUIDV4 es un tipo de dato que genera un id unico
      allowNull: false,

  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
