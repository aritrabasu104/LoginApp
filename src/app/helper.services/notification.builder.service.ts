import {Injectable} from  '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationBuilderService {
    constructor(private toastr: ToastrService ){}
    createLoginSuccess(userName:String){
      this.toastr.success("Authorized "+userName+" successfully", "Login Success");    
    }
    createLoginError(){
      this.toastr.error( "Invalid credentials provided" ,"Login Failure");
    }
    createAlert(){
      this.toastr.warning("Server might be down","Alert");
    }
  
    
}