<?php

namespace App\Http\Controllers;

use App\Models\DefaultCheckList;
use Illuminate\Http\Request;

class DefaultChecklistController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
        $data=[];
        $defaultChecklist=DefaultCheckList::paginate(10);

        return view('dashboard.defaultChecklist.allDefaultChecklist',$data);
    }

    public function add(){
        return view('dashboard.defaultChecklist.addDefaultChecklist');

    }
}
