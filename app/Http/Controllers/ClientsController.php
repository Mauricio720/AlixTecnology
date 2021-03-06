<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ClientsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
        $this->middleware('check.client');

    }

    public function index(Request $request){
        $data=[];
        $data['allClients']=Client::paginate(10);
        $data['name']="";
        $data['cnpj']="";
        $data['responsible_general']="";
        $data['technical_manager']="";
        $data['financial_officer']="";
        $data['contact_monitoring']="";

        if($request->filled('name') || $request->filled('cnpj') || $request->filled('responsible_general')
            || $request->filled('technical_manager') || $request->filled('financial_officer')
            || $request->filled('contact_monitoring')){

            $name=$request->input('name');
            $cnpj=$request->input('cnpj');
            $responsible_general=$request->input('responsible_general');
            $technical_manager=$request->input('technical_manager');
            $financial_officer=$request->input('financial_officer'); 
            $contact_monitoring=$request->input('contact_monitoring');    
            $data['allClients']=$this->filterClients($name,$cnpj,$responsible_general,$technical_manager,
            $financial_officer,$contact_monitoring);

            $data['name']=$name;
            $data['cnpj']=$cnpj;
            $data['responsible_general']=$responsible_general;
            $data['technical_manager']=$technical_manager;
            $data['financial_officer']=$financial_officer;
            $data['contact_monitoring']=$contact_monitoring;
        }
        
        return view('dashboard.clients.allClients',$data);
    }

    private function filterClients($name,$cnpj,$responsible_general,$technical_manager,
        $financial_officer,$contact_monitoring){
        
        $clients=Client::query();
        
        if($name != ""){
            $clients->where('name','LIKE','%'.$name.'%');
        }

        if($cnpj != ""){
            $clients->where('cnpj','LIKE','%'.$cnpj.'%');
        }
        if($responsible_general != ""){
            $clients->where('responsible_general_name','LIKE','%'.$responsible_general.'%')
            ->orWhere('responsible_general_phone','LIKE','%'.$responsible_general.'%');
        }

        if($technical_manager != ""){
            $clients->where('technical_manager_name','LIKE','%'.$technical_manager.'%')
            ->orWhere('technical_manager_phone','LIKE','%'.$technical_manager.'%');
        }

        if($financial_officer != ""){
            $clients->where('financial_officer_name','LIKE','%'.$financial_officer.'%')
            ->orWhere('financial_officer_phone','LIKE','%'.$financial_officer.'%');
        }

        if($contact_monitoring!= ""){
            $clients->where('contact_monitoring_name','LIKE','%'.$contact_monitoring.'%')
            ->orWhere('contact_monitoring_phone','LIKE','%'.$contact_monitoring.'%');
        }

        return $clients->paginate(10);
    }

    public function seeClient($id){
        $data=[];
        $client=Client::where('id',$id)->first();
        
        if($client == null){
            return redirect()->route('allClients');
        }

        $data['client']=$client;

        return view('dashboard.clients.seeClient',$data);
    }


    public function addClientView(Request $request){
        $data=[];
        $data['registerChecklist']=$request->registerChecklist!=""?$request->registerChecklist:'';
        
        return view('dashboard.clients.addClient',$data);
    }

    public function addClient(Request $request){
        $data=$request->only(['name','cnpj','responsible_general_name','responsible_general_phone',
            'technical_manager_name','technical_manager_phone','financial_officer_name','financial_officer_phone',
            'contact_monitoring_name','contact_monitoring_phone','street','number','neighboorhood','state','cep'
        ]);

        $id=Auth::user()->id;
        $this->validatorClient($data,$id);
        
        if($this->verifyClient($data['cnpj'])==false){
            $client=new Client();
            $client->name=$data['name'];
            $client->cnpj=$data['cnpj'];
            $client->responsible_general_name=$data['responsible_general_name'];
            $client->responsible_general_phone=$data['responsible_general_phone'];
            $client->technical_manager_name=$data['technical_manager_name'];
            $client->technical_manager_phone=$data['technical_manager_phone'];
            $client->financial_officer_name=$data['financial_officer_name'];
            $client->financial_officer_phone=$data['financial_officer_phone'];
            $client->contact_monitoring_name=$data['contact_monitoring_name'];
            $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
            $client->street=$data['street'];
            $client->number=$data['number'];
            $client->neighboorhood=$data['neighboorhood'];
            $client->state=$data['state'];
            $client->cep=$data['cep'];
            $client->save();
        }else{
            return redirect()->route('addClientView')->withInput()->withErrors('Cnpj ja cadastrado!');
        }
        
        if($request->filled('registerChecklist')){
            return redirect()->route('addChecklist');
        }else{
            return redirect()->route('allClients');
        }
        
    }

    public function editClientView($id){
        $data=[];
        $client=Client::where('id',$id)->first();
        
        if($client == null){
            return redirect()->route('allClients');
        }

        $data['client']=$client;

        return view('dashboard.clients.editClient',$data);
    }

    public function editClient(Request $request){
        $data=$request->only(['id','name','cnpj','responsible_general_name','responsible_general_phone',
            'technical_manager_name','technical_manager_phone','financial_officer_name','financial_officer_phone',
            'contact_monitoring_name','contact_monitoring_phone','street','number','neighboorhood','state','cep'
        ]);

        $id=Auth::user()->id;
        $this->validatorClient($data,$id);
        $client=Client::where('id',$data['id'])->first();
        
        if($client->cnpj != $data['cnpj']){
            if($this->verifyClient($data['cnpj'])==false){
                $client->name=$data['name'];
                $client->cnpj=$data['cnpj'];
                $client->responsible_general_name=$data['responsible_general_name'];
                $client->responsible_general_phone=$data['responsible_general_phone'];
                $client->technical_manager_name=$data['technical_manager_name'];
                $client->technical_manager_phone=$data['technical_manager_phone'];
                $client->financial_officer_name=$data['financial_officer_name'];
                $client->financial_officer_phone=$data['financial_officer_phone'];
                $client->contact_monitoring_name=$data['contact_monitoring_name'];
                $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
                $client->street=$data['street'];
                $client->number=$data['number'];
                $client->neighboorhood=$data['neighboorhood'];
                $client->state=$data['state'];
                $client->cep=$data['cep'];
                $client->save();
            }else{
                return redirect()->route('addClientView')->withInput()->withErrors('Cnpj ja cadastrado!');
            }
        }else{
            $client->name=$data['name'];
            $client->cnpj=$data['cnpj'];
            $client->responsible_general_name=$data['responsible_general_name'];
            $client->responsible_general_phone=$data['responsible_general_phone'];
            $client->technical_manager_name=$data['technical_manager_name'];
            $client->technical_manager_phone=$data['technical_manager_phone'];
            $client->financial_officer_name=$data['financial_officer_name'];
            $client->financial_officer_phone=$data['financial_officer_phone'];
            $client->contact_monitoring_name=$data['contact_monitoring_name'];
            $client->contact_monitoring_phone=$data['contact_monitoring_phone'];
            $client->street=$data['street'];
            $client->number=$data['number'];
            $client->neighboorhood=$data['neighboorhood'];
            $client->state=$data['state'];
            $client->state=$data['cep'];
            $client->save();
        }
        return redirect()->route('allClients');
    }

    public function deleteClient($id){
        if($id != ""){
            $client=Client::where('id',$id)->first();
            if($client != null){
                $client->delete();
            }
        }

        return redirect()->route('allClients');
    }

    
    private function verifyClient($cnpj){
        $client=Client::where('cnpj',$cnpj)->first();
        
        if($client != null){
            return true;
        }else{
            return false;
        }
    }

    private function validatorClient($data,$id){
        return Validator::make($data,[
            'name'=>['required','string','max:250'],
            'cnpj'=>['cnpj','required','string'],
            'responsible_general_name'=>['required','string','max:150'],
            'responsible_general_phone'=>['string','max:20','celular_com_ddd'],
            'technical_manager_name'=>['string','max:150'],
            'technical_manager_phone'=>['string','max:20','celular_com_ddd'],
            'financial_officer_name'=>['string','max:150'],
            'financial_officer_phone'=>['string','max:20','celular_com_ddd'],
            'contact_monitoring_name'=>['string','max:150'],
            'contact_monitoring_phone'=>['string','max:20','celular_com_ddd'],
            'street'=>['string','max:100','nullable'],
            'number'=>['string','max:10','nullable'],
            'neighboorhood'=>['string','max:100','nullable'],
            'state'=>['string','max:100','nullable'],
            'cep'=>['string','max:100','nullable','formato_cep'],
        ],[],[
            'name'=>'nome cliente',
            'responsible_general_name'=>'nome respons??vel geral',
            'responsible_general_phone'=>'telefone respons??vel geral',
            'technical_manager_name'=>'nome respons??vel t??cnico',
            'technical_manager_phone'=>'telefone respons??vel t??cnico',
            'financial_officer_name'=>'nome respons??vel financeiro',
            'financial_officer_phone'=>'telefone respons??vel t??cnico',
            'contact_monitoring_name'=>'nome respons??vel monitoramento',
            'contact_monitoring_phone'=>'telefone respons??vel monitoramento',
            'street'=>'rua',
            'number'=>'numero',
            'neighboorhood'=>'bairro',
            'state'=>'estado',
        ])->validate();
    }
}
