

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






























// db.Attendance_DB.aggregate([
//   {
//     $lookup: {
//       from: "Topics_DB",
//       localField: "topic_id",
//       foreignField: "topic_id",
//       as: "Topic",
//     },
//   },
//   {
//     $lookup: {
//       from: "Task_DB",
//       localField: "topic_id",
//       foreignField: "topic_id",
//       as: "Task",
//     },
//   },
//   {
//     $match: {
//       $and: [{ attendance: false }, { "Task.submit": false }],
//     },
//   },
//   {
//     $match: {
//       $and: [
//         {
//           $and: [
//             { "Topic.topic_Date": { $gt: new Date("2020-10-15") } },
//             { "Topic.topic_Date": { $lt: new Date("2020-10-31") } },
//           ],
//         },
//         {
//           $and: [
//             { "Task.task_date": { $gt: new Date("2020-10-15") } },
//             { "Task.task_date": { $lt: new Date("2020-10-31") } },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     $count: "absent & task not submitted student",
//   },
// ]);


// db.Attendance_DB.aggregate([

//   {
//     $lookup: {
//       from: "Task_DB",
//       localField: "topicId",
//       foreignField: "topicId",
//       as: "TASK",
//     },
//   },
//   {
//     $match: {
//       $and: [{ attendance: false }, { "TASK.submit": false }],
//     },
//   },
//   {
//     $match: {
//       $and: [
//         // {
//         //   $and: [
//         //     { "topicInfo.topicDate": { $gt: new Date("30-sep-2020") } },
//         //     { "topicInfo.topicDate": { $lt: new Date("01-nov-2020") } },
//         //   ],
//         // },
//         {
//           $and: [
//             { "TASK.task_date": { $gt: new Date("2020-10-15") } },
//             { "TASK.task_date": { $lt: new Date("2020-10-31") } },
//           ],
//         },
//       ]
//     },
//   },
//   {
//     $count: "absent & task not submitted student",
//     _id:0,
//    " TASK.task":1,
//   },
// ]);
















