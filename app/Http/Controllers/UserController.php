<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('auth');

    }

    public function index(Request $request){
        $data=[];
        $data['allUsers']=User::where('id','!=',Auth::user()->id)->paginate(10);
        $data['permissionChoose']=$this->permission;
     
        $data['name']="";
        $data['email']="";
        $data['permission']="";

        if($request->filled('name') || $request->filled('email') || $request->input('permission') != 0){
            $userQuery=User::query();
            $name=$request->input('name');
            $email=$request->input('email');
            $permission=$request->input('permission'); 
            
            if($name != ""){
                $userQuery->where('name','LIKE','%'.$name.'%');
            }

            if($email != ""){
                $userQuery->where('email','LIKE','%'.$email.'%');
            }

            if($permission != 0){
                $userQuery->where('permission',$permission);
            }

            $data['allUsers']=$userQuery->where('id','!=',Auth::user()->id)->paginate(10);
            $data['name']=$name;
            $data['email']=$email;
            $data['permission']=$permission;
        
        }

        return view('dashboard.users.allUsers',$data);
    }

    public function addUser(Request $request){
        $data=$request->only('name','email','permission','password');
        $id=Auth::user()->id;

        $this->validatorUser($data,$id);

        if($request->filled(['name','email','permission'])){
            $user=new User();
            $user->name=$data['name'];
            $user->email=$data['email'];
            $user->permission=$data['permission'];
            $user->password=Hash::make($data['password']);
            $user->save();
        }
        
        return redirect()->route('allUsers');
    }

    public function editUser(Request $request){
        $data=$request->only('id','name','email','permission','password');

        $this->validatorUser($data,$data['id']);
            
        if($request->filled(['name','email','permission'])){
            $user=User::where('id',$data['id'])->first();
            $user->name=$data['name'];
            $user->email=$data['email'];
            $user->permission=$data['permission'];
            $user->password=$user->password != $data['password']?Hash::make($data['password']):$user->password;
            $user->save();
        }
        
        return redirect()->route('allUsers');
    }

    public function deleteUser($id){
        if($id != ""){
            $user=User::where('id',$id)->first();
            if($user != null){
                $user->delete();
            }
        }

        return redirect()->route('allUsers');
    }

    public function myProfile(Request $request){
        $data=$request->only('id','name','email','permission','password');

        $this->validatorUser($data,$data['id']);
            
        if($request->filled(['name','email','permission'])){
            $user=User::where('id',$data['id'])->first();
            $user->name=$data['name'];
            $user->email=$data['email'];
            $user->permission=$data['permission'];
            $user->password=$user->password != $data['password']?Hash::make($data['password']):$user->password;
            $user->save();
        }
        
        return redirect()->route('allUsers');
    }

    private function validatorUser($data,$id){
        
        Validator::make($data,[
            'name'=>['required','max:255'],
            'email'=>['required','email',Rule::unique('users')->ignore($id)],
            'permission'=>['required','in:1,2'],
            'password'=>['required','string']
        ],[],[
            'name'=>'nome',
            'permission'=>'permissão',
            'password'=>'senha'
        ])->validate();
    }
}
