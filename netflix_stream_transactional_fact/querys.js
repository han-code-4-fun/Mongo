
/*
What is the average age of 
users watching on their mobile?
*/

db.netflix.aggregate([{
    $match: {
        "Customer.DateOfBirth":{$exists:true},
        "Device.Type":"Cellphone"
    }
},{
    $project: { 
        date:{
            $dateFromString: {
               dateString: '$Customer.DateOfBirth'
            }
         }
     } 
}, {
    $group: {
    _id: {count: {$sum:1}}, 
    avg: {$avg: {$divide: [{$subtract: [  new Date(), "$date" ] }, 
                    365 * 24*60*60*1000]}}}
},{
    $sort: {avg:-1}
}]);




//  List top 5 countries sort by the highest 
//  number of viewers watching Documentary.
db.netflix.aggregate([{
        $match: 
        { "Location.Country":{$exists:true},
            "Content.Type":"Documentary"}
    },{
        $group: {
        _id: {"Country": "$Location.Country"}, 
        count: {$sum: 1}} 
    },
    {$sort: {count:-1}},
    { $limit: 5}
    ]);


// How many female customers watched movies 
// between the 6:00pm-7:59pm) in 2018?

db.netflix.find({ 
    $and:
    [
    {"Content.Type":"Movie"},
    {"Stream_Date":/^2018/},
    {"Customer.Gender":"Female"},
    {"Stream_StartTime":{$in:
        [/^18/,
        /^19/]}} 
    ] }
).count()



   
/*

Ranked in order of highest to lowest, 
which 5 countries have the largest number 
of users who have premium membership?

*/

db.netflix.aggregate([
    {
        $match: 
        {"Customer.Country":{$exists:true},
            "Membership.Type":"Premium"}
    },{
        $group: {
        _id: {"Country": "$Customer.Country"}, 
        count: {$sum: 1}
    }},
    { $sort: {count:-1}}
    ]);

/*
    List the number of users access 
    Netflix by different devices in percentage.

*/



var nums = db.netflix.count()
db.netflix.aggregate([
    {$match: {"Device.Type":{$exists:true}}
    },{$group: {
        _id: {"DeviceType": "$Device.Type"}, 
        count: {$sum: 1}}},    
    { "$project": { 
        "count": 1, 
        "percentage": { 
            "$concat": [ { "$substrBytes": [ 
                { "$multiply": [ 
                { "$divide": [ "$count",  nums ] }, 
                100  ] }, 0,2 ] }, "", "%" ]}
        }
    },{ $sort: {count:-1}} ])




//How many customer stream more than 30 mins for a comedy movie this year


db.getCollection('netflix').find(
    {
        $and:
        [
        {"Stream_Date": {$gte:"2018-01-01"}},
        {"Content.Genre":/Comedy/},
        {"Stream_Watch_Duration_Minute":{$gte:30}}
        ]
     
    }
    ).count();





//how many customers watched the action movie last month?
db.getCollection('netflix').find(
    {
        $and:
        [
        {"Stream_Date": {$gte:"2018-10-01", $lte:"2018-10-31"}},
        {"Content.Genre":/Action/}
        ]
     
    }
    ).count();




