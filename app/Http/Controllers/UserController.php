<?php
namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller{

    public function register(Request $req){
        $validator = Validator::make($req->json()->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string|max:25',
            'email' => 'required|string|email|min:5|max:250',
            'password' => 'required|string|min:1',
        ]);

        if($validator->fails()){
            $messages = $validator->messages();
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'first_name' => $req->json()->get('first_name'),
            'last_name' => $req->json()->get('last_name'),
            'username' => $req->json()->get('username'),
            'email' => $req->json()->get('email'),
            'password' => Hash::make($req->json()->get('password')),
        ]);

        //give user a session token
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user','token'),201);
    }

    public function login(Request $req){
        $reqtoken = $req->json()->all();

        try{
            if(!$token = JWTAuth::attempt($reqtoken)){
                return response()->json(['error' => 'token couldnt be identified'], 400);
            }
        }
        catch(JWTException $e){
            return response()->json(['error' => 'token could not be created'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getUser(){
        try{
            if(!$user =JWTAuth::parseToken()->authenticate() ){
                return response()->json(['User not found'], 404);
            }
        }
        catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function retriveallUsers() {
        $allUsers = \DB::table('Users')->get();
        return response()->json(compact('allUsers'));
    }

    public function connectUser(Request $req) {
        $currUser = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['connected_users' => $req->json()->get('connected_user_id')]);
        $otherUserUpdate = \DB::table('Users')->where('id',$req->json()->get('connected_user_id'))->update(['connected_users' => $req->json()->get('id')]);
        $currUserDateUpdate = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_date' => NULL]);
        $currUserTime = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_time' => NULL]);
        $otherUserDateUpdate = \DB::table('Users')->where('id',$req->json()->get('connected_user_id'))->update(['phone_calls_date' => NULL]);
        $otherUserTimeUpdate = \DB::table('Users')->where('id',$req->json()->get('connected_user_id'))->update(['phone_calls_time' => NULL]);
        return response()->json(compact('currUser', 'otherUserUpdate'));
    }

    public function schedulePhoneCall(Request $req) {
        $currUser = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_date' => $req->json()->get('phone_date')]);
        $currUserTime = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_time' => $req->json()->get('phone_time')]);
        $connectedUserId = \DB::table('Users')->where('id',$req->json()->get('id'))->select('connected_users')->pluck('connected_users')->first();
        $otherUser = \DB::table('Users')->where('id',$connectedUserId)->update(['phone_calls_date' => $req->json()->get('phone_date')]);
        $otherUserPartTwo = \DB::table('Users')->where('id',$connectedUserId)->update(['phone_calls_time' => $req->json()->get('phone_time')]);
        return response()->json(compact('currUser','otherUser','connectedUserId'));
    }

    public function getConnectedUser(Request $req){
        $currConnectedUser = \DB::table('Users')->where('id',$req->json()->get('id'))->value('first_name');
        $currConnectedUserLastName = \DB::table('Users')->where('id',$req->json()->get('id'))->value('last_name');
        return response()->json(compact('currConnectedUser','currConnectedUserLastName'));
    }

    public function cancelCall(Request $req){
        $currUser = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_date' => NULL]);
        $currUserTime = \DB::table('Users')->where('id',$req->json()->get('id'))->update(['phone_calls_time' => NULL]);
        $otherConnectedUserId = \DB::table('Users')->where('id',$req->json()->get('id'))->select('connected_users')->pluck('connected_users')->first();
        $otherUserPhone = \DB::table('Users')->where('id',$otherConnectedUserId)->update(['phone_calls_date' => NULL]);
        $otherUserTime = \DB::table('Users')->where('id',$otherConnectedUserId)->update(['phone_calls_time' => NULL]);
        return response()->json(compact('currUser','otherUserPhone','otherUserTime'));
    }
    
}