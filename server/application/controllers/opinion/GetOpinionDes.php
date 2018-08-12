


<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class GetOpinionDes extends CI_Controller {
    public function index() {
      //$request = file_get_contents('php://input');
      //$arr = json_encode($request,true);
      //$id = $arr['userid'];
        $oidKey = $_GET['opinionID'];    
         $res = DB::raw("SELECT opinionname, opiniondes FROM opinion WHERE opinionid = ?", array($oidKey));
         $result = $res->fetchAll();
         //print_r($result);
         echo json_encode($result);
       
    }
}


