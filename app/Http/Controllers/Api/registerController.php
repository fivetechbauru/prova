<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\register;

class registerController extends Controller
{

    public function index()
    {
        return register::all();
    }


    public function store(Request $request)
    {
        register::create($request->all());
    }

    public function delete($id){
        return ["result" => "ID deletado " .$id];
    }


    public function show($id)
    {
        
    }

    public function edit($id)
    {
        Register::findOrFail($id) -> edit();
    }

    public function update(Request $request, $id)

    {
       $request->validate([
        'medicamento'=>'required|max:255',
        'quantidade'=>'required|max:255',
        'posologia'=>'required|max:255',
        'forma_adm'=>'required|max:255',
       ]);

       $register = register::find($id);

       if ($register){

        $register->medicamento = $request->medicamento;
        $register->quantidade =  $request->quantidade;
        $register->posologia =  $request->posologia;
        $register->forma_adm =  $request->forma_adm;

        $register->update();

        return response() -> json(['message' => 'Registrado com sucesso'], 200);

       } else{

        return response() -> json(['message' => 'Tente novamente'], 404);

       }

    }

    public function destroy($id)
    {
        Register::findOrFail($id) -> delete();
    }


}
