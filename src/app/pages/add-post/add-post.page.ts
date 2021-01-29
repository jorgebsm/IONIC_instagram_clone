import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var window: any;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  tempImages: string[] = [];
  post = {
    message: '',
    coords: null,
    posicion: false
  };
  loadingGeo: boolean = false;

  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) { }

  ngOnInit() {
  }

  async crearPost() {

    const creado = await this.postService.createPost( this.post );
    
    this.post = {
      message: '',
      coords: null,
      posicion: false 
    }

    this.route.navigateByUrl('/posts');

  }

  getGeo() {

    if ( !this.post.posicion ) {
      this.post.coords = null;
      return;
    }

    this.loadingGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingGeo = false;
      const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;      
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loadingGeo = false;
     });
    
  }

  cameraClic() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;

      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log(img);

      this.tempImages.push( img );

    }, (err) => {
     // Handle error
    });

  }

  

}
