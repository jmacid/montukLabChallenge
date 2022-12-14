import { Handler } from '@netlify/functions'
import DB from '../dao/dao'

export const handler: Handler = async (event, context) => {
  
  try {
    if(!event?.body){
      throw new Error('Body empty')
    }

    const body = (event.body !== undefined) ? await JSON.parse(event.body) : null
  
    if(!body || !('fdcId' in body) ) {
      throw new Error('Bad request')
    }
        
    const db = new DB()

    await db.connect()

    if( db.client === null)
      throw new Error('The communication with the db couln\'t be established')

    const result = await db.getFoodInfo(body.fdcId)

    if( result === undefined || result?.rowCount === 0) {
      throw new Error('No data has been fetched')
    }

    db.end()
    
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
