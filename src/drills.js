require('dotenv').config()
const knex = require('knex')

const knexInstance = knex ({
    client: 'pg',
    connection: process.env.DB_URL
})


// Search items containing the wildcard searchTerm
function searchAllItems(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`) // ILIKE = case insensitive
        .then(result => {
            console.log(result)
        })
}

// searchAllItems('sal')

function paginatedItems(pageNumber) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber -1) 
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

// paginatedItems('3')

function dateAddedAfter(daysAgo) {
    knexInstance
        .select('*')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo),
        )
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })
}

// dateAddedAfter('10')

function totalCost() {
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

totalCost()
