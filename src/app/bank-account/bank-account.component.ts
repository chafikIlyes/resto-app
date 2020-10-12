import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../shared/bank.service';
import { BankAccountService } from '../shared/bank-account.service';



@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms: FormArray = this.fb.array([])
  bankList: any = [];
  notification=null;
 

  constructor(private fb: FormBuilder,
    private bankService: BankService,
    private bankAccountService: BankAccountService,
  ) { }



  ngOnInit() {

    this.bankService.getBankList().subscribe((result) => {
      console.warn(result);
      this.bankList = result;
    })



    this.bankAccountService.getBankAccountList().subscribe(
      res => {
        if (res == []) {
          this.addBankAccountForms();
        } else {
          // generate formArray as per the data received from banAccount Table
          (res as []).forEach((bankAccount: any) => {

            this.bankAccountForms.push(this.fb.group({
              id: [bankAccount.id],
              accountNumber: [bankAccount.accountNumber, Validators.required],
              accountHolder: [bankAccount.accountHolder, Validators.required],
              bankId: [bankAccount.bankId, Validators.min(1)],
              IFSC: [bankAccount.IFSC, Validators.required]

            }));

          });

        }
      })
  }

  addBankAccountForms() {

    this.bankAccountForms.push(this.fb.group({
      id: [0],
      accountNumber: ['', Validators.required],
      accountHolder: ['', Validators.required],
      bankId: [0, Validators.min(1)],
      IFSC: ['', Validators.required]

    }));

  }

  recordSubmit(fg: FormGroup) {
    console.warn("Befor saving : ", fg.value);

    if (fg.value.id == 0)
      this.bankAccountService.postBankAccount(fg.value)
        .subscribe(
          (res: any) => {
            console.warn("After saving : ", res);

            fg.patchValue({ id: res.id })
            this.showNotification('insert');

          });

    else this.bankAccountService.putBankAccount(fg.value)
      .subscribe(
        (res: any) => {
          console.warn("After updating : ", res);
          this.showNotification('update');


        });
  }

  onDelete(id,i){
    
    if(id==0)     
      this.bankAccountForms.removeAt(i);
    
    else confirm("are you sure you want to delete ?")
      this.bankAccountService.deleteBankAccount(id)
        .subscribe(res=>{

          this.bankAccountForms.removeAt(i);
          this.showNotification('delete');


        });
  }

  showNotification(category){
    switch (category){
      case  'insert':
        this.notification={class:'text-success', message: 'saved !'};
        break;

        case  'update':
          this.notification={class:'text-primary', message: 'updated !'};
          break;

          case  'delete':
            this.notification={class:'text-danger', message: 'deleted !'};
            break;


      default : 
      break;
    }

    setTimeout(() => {
      this.notification=null
    }, 3000);

  }

}
