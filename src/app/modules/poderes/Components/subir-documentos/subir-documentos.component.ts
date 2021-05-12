import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subir-documentos',
  templateUrl: './subir-documentos.component.html',
  styleUrls: ['./subir-documentos.component.scss']
})
export class SubirDocumentosComponent implements OnInit {
  @Output()
  documento: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = '';
  base64: string;

  constructor() { }

  ngOnInit(): void {
  }

  convertir_documento(documentFile){
    let reader = new FileReader();
    return new Promise ( (resolve)=>{
      reader.readAsDataURL(documentFile[0]);
      reader.onload = (e: any) => {
        var binaryData = e.target.result;
          resolve(window.btoa(binaryData));
      };    
    });
  }
  uploadFileEvt(documentFile: any) {
    console.log(documentFile);
    this.convertir_documento(documentFile).then( (resp:any) => {
      var objDocumento = {
        base64: resp,
        extension: documentFile[0].type
      }
        this.documento.emit(objDocumento)
    }); 

    // let reader = new FileReader();

    // reader.readAsDataURL(documentFile[0]);
    // reader.onload = (e: any) => {
    //   var binaryData = e.target.result;
    //   this.base64 = window.btoa(binaryData);
    // };

    // if (documentFile.target.files && documentFile.target.files[0]) {
    //   this.fileAttr = '';
    //   Array.from(documentFile.target.files).forEach((file: File) => {
    //     this.fileAttr += file.name;
    //   });
    //   console.log(documentFile.target.files);

    //   let reader = new FileReader();
    //   reader.readAsDataURL(documentFile.target.files[0]);
    //   reader.onload = (e: any) => {
    //     e.modelvalue = reader.result;
    //   };

    //   console.log(reader.result);
    //   // HTML5 FileReader API
    //   // let reader = new FileReader();
    //   // reader.onload = (e: any) => {
    //   //   let image = new Image();
    //   //   image.src = e.target.result;
    //   //   image.onload = rs => {
    //   //     let imgBase64Path = e.target.result;
    //   //     console.log(imgBase64Path);
    //   //   };
    //   // };

    //   // reader.readAsDataURL(documentFile.target.files[0]);

    //   // Reset if duplicate image uploaded again
    //   this.fileInput.nativeElement.value = "";
    // } else {
    //   this.fileAttr = 'SELECCIONE DOCUMENTO';
    // }
  }
}