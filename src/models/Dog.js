const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          startWithCapitalize(value){
            if(value[0]!==value[0].toUpperCase())throw new Error("Race name must begin with a capital letter")
          } ,
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          const getter=this.getDataValue("image");
          return {url:getter}
        }
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          const getter=this.getDataValue("height");
          return {metric:getter}
        },
        validate:{
          heightValid(value){
            const val=value.split(" - ")
            if(val.length !==2 )throw new Error("Height must be divided by ' - '")
            if(Number(val[0]) <= 0 || Number(val[1]) <= 0)throw new Error("Height must be positive")
            if(Number(val[0]) > Number(val[1]))throw new Error("The min height cannot be greater than the max height")
          }
        }
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          const getter=this.getDataValue("weight");
          return {metric:getter}
        },
        validate:{
          weightValid(value){
            const val=value.split(" - ")
            if(val.length !==2)throw new Error("Weight must be divided by ' - '")
            if(Number(val[0]) <= 0 || Number(val[1]) <= 0)throw new Error("Weight must be positive")
            if(Number(val[0]) > Number(val[1]))throw new Error("The min Weight cannot be greater than the max weight")
          }
        }
      },
      
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          lifeSpanValid(value){
            const val=value.split(" - ")
            if(val.length !==2)throw new Error("Life span must be divided by ' - '")
            if(Number(val[0]) <= 0 || Number(val[1]) <= 0)throw new Error("Life span must be positive")
            if(Number(val[0]) > Number(val[1]))throw new Error("The min Life span cannot be greater than the max life span")
          }
        }
      },
    },
    { timestamps: false }
  );
};
