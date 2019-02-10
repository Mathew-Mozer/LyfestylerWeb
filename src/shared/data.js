export const Diets = [{
    name: 'Strict Keto',
    id:0,
    restrictions: [{
        name: 'Grains',
        carbMax: 28
    }, {
        name: 'Potatoes',
        carbMax: 17
    }]
}, {
    name: 'Mat\'s Diet',
    id:1,
    restrictions: [{
        name: 'Salmon',
    }, {
        name: 'Watermelon',
    }]
}]

export const Items = [
    {
        UPC:'493',
        Name:'Bertoli Pasta',
        Nutrition:{
            SatFat:{
                units:5,
                measure:'g'
            },
            Cholest:{
                units:40,
                measure:'mg'
            },
            Sodium:{
                units:410,
                measure:'mg'
            },
            TotalCarb:{
                units:2,
                measure:'g'
            },
            Fiber:{
                units:0,
                measure:'g'
            },
            Sugar:{
                units:.5,
                measure:'g'
            },
            Protein:{
                units:2,
                measure:'g'
            }
        }
    }
]