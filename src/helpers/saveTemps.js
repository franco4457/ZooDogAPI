const axios=require('axios');
const {Temperament}=require("../db")

const saveTemps=async()=>{
    const allDogs=await axios.get('https://api.thedogapi.com/v1/breeds').then((res)=>res.data)
    let temps=[]
    allDogs.forEach(dog=>{
        if(dog.temperament){
        const dogTemp=dog.temperament.split(', ')
        dogTemp.forEach(temp=>{
            if(!temps.includes(temp))temps.push(temp)
        })}
    })
    temps=temps.map(t=>{return {name:t}})
    await Temperament.bulkCreate(temps).then(()=>console.log('Temperament Saved'))
}
saveTemps()
module.exports = saveTemps