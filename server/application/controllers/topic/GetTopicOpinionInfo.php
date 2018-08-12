


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class GetTopicOpinionInfo extends CI_Controller {
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
         $idKey = $_GET['topicID'];
         $isCloseKey = (int)$_GET['isClose'];
         $topicTypeKey = (int)$_GET['topicType'];
          //echo json_encode($nameKey);
         //$nameKey = '琴瑟在御莫不静好';
         //如果topic没有close
         if($isCloseKey == 0){
         $res = DB::raw("SELECT O.opinionid, O.opinionname, O.opiniondes FROM topic T, opinion O WHERE T.topicid = ? and T.topicid = O.topicid", array($idKey));
         $result = $res->fetchAll();
         //print_r($result);
         echo json_encode($result);
         }
         //若topic已经close，且为YN topic
         else if($topicTypeKey == 0){
          $res = DB::raw("SELECT yesno from topic where topicid = ?", array($idKey));
          $result = $res->fetchAll();
         //print_r($result);
          echo json_encode($result);
         }
         //若topic已经 close，且为BS topic
         else {
           $res = DB::raw("SELECT opinionname from topic T, opinion O where T.topicid = ? and T.topicid = O.topicid and O.isChosen = 1", array($idKey));
          $result = $res->fetchAll();
         //print_r($result);
          echo json_encode($result);
         }
        
    }
}


