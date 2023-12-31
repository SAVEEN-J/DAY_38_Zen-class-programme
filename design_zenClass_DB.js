

// Design database for Zen class programme
// users
// codekata
// attendance
// topicsmom
// tasks
// company_drives
// mentors


//1 Find all the topics and tasks which are thought in the month of October
//2 Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
// 3 Find all the company drives and students who are appeared for the placement.
//4  Find the number of problems solved by the user in codekata
//5  Find all the mentors with who has the mentee's count more than 15
// 6 Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

//1  Find all the topics and tasks which are thought in the month of October

db.Topics_DB.aggregate([
    {
      $lookup: {
        from: "Task_DB",
        localField: "topic_id",
        foreignField: "topic_id",
        as: "CompletedTask",
      },
    },
    {
      $match: {
        $and: [
          {
            $and: [
              { topic_Date: { $gte: new Date("2020-10-01") } },
              { topic_Date   : { $lte: new Date("2020-10-31") } },
            ],
          },
          {
            $and: [

              { "CompletedTask.task_date": { $gte: new Date("2020-10-01") } },
              { "CompletedTask.task_date": { $lte: new Date("2020-10-31") } },
            ],
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        topic: 1,
        topic_Date: 1,
        "CompletedTaskc.user_id": 1,
        "CompletedTaskc.task": 1,
        "CompletedTaskc.task_date": 1,
        "CompletedTaskc.submit": 1,
      },
    }])





// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
  db.Company_drive_DB.find({
    open_date:{$gt: new Date("2020-10-15"),$lt: new Date("2020-10-31")}
    })

    // 3.Find all the company drives and students who are appeared for the placement.
    db.Company_drive_DB.aggregate([
      {
        $lookup: {
          from:"User_DB",
          localField: "topic_id",
          foreignField: "topic_id",
          as:"PlacementInfo",

        },
      },
      {
        $project: {
          _id: 0,
      
          "PlacementInfo.user_name": 1,  
         
          "PlacementInfo.user_mail": 1,
          "PlacementInfo.user_Number": 1,    
          company_name: 1,    

        },

      },
    ])
    //4  Find the number of problems solved by the user in codekata
    db.Codekata_DB.aggregate([
      {
        $lookup: {
          from:"User_DB",
          localField: "user_id",
          foreignField: "user_id",
          as:"SolvedProblems",
        },
      },
      {
        $project: {
          _id: 0,
          problemSolved:1,   
          "SolvedProblems.user_id": 1,    
          "SolvedProblems.user_batchNO": 1,  
          "SolvedProblems.user_name": 1,    

        },

      },
    ])
    



// 5 Find all the mentors with who has the mentee's count more than 15

db.User_DB.aggregate([
  {
    '$group': {
      '_id': '$mentor_id', 
      'count': {
        '$sum': 1
      }, 
      'mentor_name': {
        '$first': '$mentor_name'
      }
    }
  }, {
    '$match': {
      'count': {
        '$gt': 15
      }
    }
  }
])


// 6 Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020


  db.User_DB.aggregate([
    {
      $lookup:{
        from:"Attendance_DB",
        localField:"user_id",
        foreignField:"user_id",
        as: "absent"
      },
    
    },
      {
    $lookup:{
    from:"Task_DB",
        localField:"user_id",
        foreignField:"user_id",
        as: "inCompletTask"
    
    },
    },
    {
      $project:{
    _id:0,
    user_name:1,
    user_id:1,
    "absent.attendance":1,
    "inCompletTask":1
    
    },
    },{
    $match:{
    $and:[
      { "absent.attendance":false},
      { "inCompletTask.submit":false},
      { "inCompletTask.task_date": { $gte: new Date("2020-10-15") } },
      { "inCompletTask.task_date": { $lte: new Date("2020-10-31") } },

    
    ]
    
    },
    },
    
    ])























    // db.User_DB.aggregate([
    //   {
    //       $lookup: {
    //           from: "user_task_1",
    //           let: {
    //               "userId": "$user_id"
    //           },
    //           pipeline: [
    //               {
    //                   $match: {
    //                        submit: false,
    //                       $and:[{$expr: {$eq: ["$user_id", "$$userId"] }   }]  
    //                   }
              
    //               }
    
    //           ],
    
    //           as: "result"
    
    //       }
    //   },
    //   {
    //      $match:{ result:{$ne:[]} } 
    //   }
     
    // ])





































