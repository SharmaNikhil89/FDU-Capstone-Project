import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef,   } from '@angular/material/dialog';
import { SuccessModalWindowComponent } from './success-modal-window/success-modal-window.component';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit{

  myForm! : FormGroup;  // Use '!' to tell TypeScript that myForm will be initialized later

  dialogRef: MatDialogRef<SuccessModalWindowComponent>;

  constructor(private fb : FormBuilder, private http : HttpClient, public dialog : MatDialog){
    this.dialogRef = {} as MatDialogRef<SuccessModalWindowComponent>;
  }

  ngOnInit(): void{
    this.myForm = this.fb.group({
      name: [''],
      searchMedicine: [''],
      file: [''],
      radioOption: ['']
    });

    this.fetchdata();


  }

  submitForm(){

    const formData = this.myForm.value;

    console.log("Data", formData );

  }


  pharmacyRecords: [] = [];
  fetchdata(){

    this.http.get<any>('http://localhost:3000/pharmacy/getNearestPharmacy/49.172151447739914/-122.97753031844071').subscribe(
     res => {
      this.pharmacyRecords = res.data;
     },
     error => {
      console.log('Error fetching data : ' , error);
     }
    )

  }

   // Helper function to chunk array into smaller arrays
   chunkArray(array: any[], chunkSize: number): any[][] {
    return Array(Math.ceil(array.length / chunkSize))
      .fill(null)
      .map((_, index) => index * chunkSize)
      .map(begin => array.slice(begin, begin + chunkSize));
  }

  selectedCard: any;
  selectCard(card: any): void {
    this.selectedCard = card;

  }

  isFormValid(): boolean {
    const formControls = this.myForm.controls;
    let isValid = true;

    Object.keys(formControls).forEach(key => {
      if (!formControls[key].value) {
        isValid = false;
      }
    });

    // Check if a card is selected
    if (!this.selectedCard) {
      isValid = false;
    }

    return isValid;
  }

  resetForm() {
    this.myForm.reset();
    this.selectedCard = "";
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(SuccessModalWindowComponent, {
      width: '350px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed');
    });

  }


}
