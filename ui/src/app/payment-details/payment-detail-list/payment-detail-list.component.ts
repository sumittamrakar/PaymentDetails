import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(paymentdetail:PaymentDetail){
    this.service.formData = Object.assign({},paymentdetail);
  }

  onDelete(PMId){
    if(confirm('Are you sure you want to delete this record?')){
      this.service.deletePaymentDetail(PMId)
      .subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Payment Detail Register');
      },
      err => {
        console.log(err);
      })
    }
  }
}
