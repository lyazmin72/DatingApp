import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl("Hola", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    });
  }

  register(): void {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.toastr.error(error.errors);
    //   }
    // });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}