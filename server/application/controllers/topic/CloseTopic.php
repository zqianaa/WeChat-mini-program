


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class CloseTopic extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
       // $nameKey = "kat";
      //DB::insert('user', ['userid' => $idKey,'username' =>              
        //   'basketball']);
       // $res = DB::select('user', ['*'], ['userid' => $idKey]);
        //$res = DB::select('user', ['*'], ['username' => $nameKey]);       
         //$res = DB::raw("SELECT * FROM user");
         //$nameKey = $_GET[userName];
         $tidKey = $_GET['topicID'];
         $oidKey = $_GET['opinionID'];
         $endDateKey = $_GET['endDate'];
         $remarkKey = $_GET['topicRemark'];
         $topicTypeKey = (int)$_GET['topicType'];
         $yesNoKey = $_GET['yesNo'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';

         //close BrainStorm topic
         if($topicTypeKey == 1){
           DB::raw("UPDATE topic T, opinion O SET T.topicremark = ?, T.enddate = ?, T.isClose = 1, O.ischosen = 1 WHERE T.topicid = ? and T.topicid = O.topicid and O.opinionid = ?", array($remarkKey, $endDateKey, $tidKey, $oidKey));
           }
        
        //close Y/N topic
         else if($topicTypeKey == 0){
           DB::raw("UPDATE topic T SET T.topicremark = ?, T.enddate = ?, T.isClose = 1, T.yesNo = ? WHERE T.topicid = ?", array($remarkKey, $endDateKey, $yesNoKey, $tidKey));
           }
    }
}


