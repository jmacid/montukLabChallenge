import { Client, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()


export default class DB {
  client: Client | null = null;
  user = process.env.DB_USER
  host = process.env.DB_HOST
  database = process.env.DB_DB
  password = process.env.DB_PASSWORD
  port = process.env.DB_PORT !== undefined ? +process.env.DB_PORT : 5432

  async connect() {
    try{

    this.client = new Client({
      user: this.user,
      host: this.host,
      database: this.database,
      password: this.password,
      port: this.port
    })
  
    await this.client.connect()

    }catch(e){
      console.error(e)
      throw new Error(e)
    }
  }

  async getNutrientsList(): Promise<QueryResult<any> | undefined> {

    try {
      const result = await this.client?.query('SELECT "nutrientId", "name", "rank" from nutrients')
    
      return result
      
    } catch (error) {
      console.error(error)
      throw new Error('An error ocurred while trying to fetch data from the nutrients table')
    }
  }

  async getFoodByNutrients(nutrientsList): Promise<QueryResult<any> | undefined> {
    try {

      let foodList = '';
      nutrientsList.forEach( nutrient => {
        foodList += `select f."foodId"  from foodnutrients f
        where f."nutrientId" = ${nutrient.nutrientId}
        group by f."foodId"
        INTERSECT\n`
      })

      foodList = foodList.slice(0, -1*('INTERSECT\n'.length)) // get rid of the last INTERSECT

      const query = 'select * from foods f2 inner join ( ' + foodList + ') tb1 on tb1."foodId" = f2."fdcId"'

      console.log(query)

      const result = await this.client?.query(query)

      return result

    } catch (error) {
      console.error(error)
      throw new Error('An error ocurred while trying to fetch data from the nutrients table')
    }
  }

  async getFoodInfo(fdcId: number): Promise<QueryResult<any> | undefined> {
    try {

      const query = `select
        fn."foodNutrientId",
        fn."foodId" as "fdcId",
        fn."nutrientId",
        fn."dataPoints",
        fn."type",
        fn."min",
        fn."max",
        fn."median",
        fn."amount",
        fn."foodNutrientDerivation",
        n."name" as "nutrientName",
        n."unit_name"
      from foodnutrients fn
      left join nutrients n
      on fn."nutrientId" = n."nutrientId"
      where fn."foodId" = ${fdcId}
      order by n."rank"`

      console.log(query)

      const result = await this.client?.query(query)

      return result

    } catch (error) {
      console.error(error)
      throw new Error('An error ocurred while trying to fetch data from the db')
    }
  }

  end(){
    this.client?.end();
  }
}