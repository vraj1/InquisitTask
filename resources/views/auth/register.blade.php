@extends('app.layout')
<div class="container"> 
    <div class="row justify-content-centre">
        <div class="card">
            <div class="card-header">
                {{ __('Register')}}
            </div>
            <div class="card-body">
                <form method = "POST" action="{{route('register')}}">
                    @csrf
                    <!--Form Fields-->
                    <div class="form-group row">
                        <label for="first_name">{{ __('First Name') }}</label>
                        <div class="col md-6">
                            <input id="first_name" type="text" class="form-control{{ $errors->has('first_name') ? ' is-invalid': ''}}" name ="first_name" value="{{old('first_name')}}"  placeholder="First Name">
                            @if ($errors->has('first_name'))
                                <span class="invalid" role="alert"> {{$errors->('first_name')}}</span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="last_name">{{ __('Last Name') }}</label>
                        <div class="col md-6">
                            <input id="lastt_name" type="text" class="form-control{{ $errors->has('last_name') ? ' is-invalid': ''}}" name ="last_name" value="{{old('last_name')}}" placeholder="Last Name">
                            @if ($errors->has('last_name'))
                                <span class="invalid" role="alert"> {{$errors->('last_name')}}</span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="email">{{ __('Email') }}</label>
                        <div class="col md-6">
                            <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid': ''}}" name ="email" value="{{old('email')}}" placeholder="Email">
                            @if ($errors->has('email'))
                                <span class="invalid" role="alert"> {{$errors->('email')}}</span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="username">{{ __('UserName') }}</label>
                        <div class="col md-6">
                            <input id="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid': ''}}" name ="username" value="{{old('username')}}" placeholder="Username">
                            @if ($errors->has('username'))
                                <span class="invalid" role="alert"> {{$errors->('username')}}</span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password">{{ __('Password') }}</label>
                        <div class="col md-6">
                            <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid': ''}}" name ="password" value="{{old('password')}}" placeholder="Password">
                            @if ($errors->has('password'))
                                <span class="invalid" role="alert"> {{$errors->('password')}}</span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection