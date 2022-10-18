import { Handler } from '@netlify/functions'
import DB from '../dao/dao'

export const handler: Handler = async (event, context) => {
  
  try {
    if(!event?.body){
      throw new Error('Body empty')
    }

    const body = (event.body !== undefined) ? await JSON.parse(event.body) : null
  
    if(!body || !('nutrients' in body) || !Array.isArray(body.nutrients) || body.nutrients.length === 0) {
      throw new Error('Bad request')
    }

    const nutrientsList = body.nutrients 
    
    const db = new DB()

    await db.connect()

    if( db.client === null)
      throw new Error('The communication with the db couln\'t be established')

    const result = await db.getFoodByNutrients(nutrientsList)

    if( result === undefined || result?.rowCount === 0) {
      throw new Error('No data has been fetched')
    }

    
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error has occurred',
      }),
    }
  }

}
