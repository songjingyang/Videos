import React from 'react';
import urlMaps from '../../common/urlMaps'
import { Upload, Icon, message, Button, Progress } from 'antd';
import { inject, observer } from 'mobx-react';
// import Video from '../../models/Video';
import { func } from 'prop-types';
interface Props {
  getVideoUrl: any
}
interface State {
  loading: boolean;
  imageUrl: string;
  file: any;
  uploadUrl: string;
  percent: number,
  status : Boolean

}
export default class UpVideo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      uploadUrl: urlMaps.commonUpload,
      loading: false,
      imageUrl: '',
      file: {},
      percent: 0,
      status :false
    };
  }
componentDidMount(){
  
}
  componentWillReceiveProps(nextProps: any) {
    debugger
    console.log('nextProps', nextProps);
    if ('value' in nextProps) {
      this.setState({
        imageUrl: nextProps.value,
      });
    }
    if ('uploadUrl' in nextProps) {
      this.setState({
        uploadUrl: nextProps.uploadUrl,
      });
    }
  }
  beforeUpload = (file: any) => {
    this.setState({
      file: this.state.file,
    });
    const isVideo= file.type==="video/mp4"||file.type ==="video/webm" ||file.type==="video/ogg"
    if(!isVideo){
      message.error('视频格式仅支持mp4、webm和ogg')
    }
    // var video_url = window.URL.createObjectURL(file);
    // var video = document.createElement('video')
    // video.src = video_url
    // video.onloadstart = function(e){
    //   console.log(video.duration,video.width,"duration")
    // }
 
    // const isJPG = file.type === 'image/jpeg'
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!')
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!')
    // }
    // const isLt500KB = file.size / 1024 / 1024 / 4 < 0.5;
    // if (!isLt500KB) {
    //   message.error("Image must smaller than 500KB!");
    // }
    // "http://223.203.221.52:8088/api/"
    // return isJPG && isLt2M
    return isVideo;
  };
  handleChange = (file: any) => {
  console.log("TCL: UpVideo -> handleChange -> file", file)
    
    if (file.file.status === 'uploading') {
      this.setState({ loading: true, percent: file.file.percent ,status:true});
      return;
    }
    if (file.file.status === 'done') {
      if (file.file.response.code == 200) {
        const imgUrl = file.file.response.data.url;
        this.setState(
          {
            imageUrl: imgUrl,
            percent: file.file.percent,
            loading: false,
            status:true

          },
          () => {
            this.props.getVideoUrl(this.state.imageUrl);
          }
        );
      }else{
        message.error(file.file.response.msg)
        this.setState({
          loading: false,
          status :false
        })
      }

      // getBase64(file.originFileObj, imgUrl =>
      //   this.setState(
      //     {
      //       imgUrl,
      //       loading: false
      //     },
      //     () => {
      //       this.props.onChange(imgUrl)
      //     }
      //   )
      // )
    }
  };

  render() {
    const uploadButton = (
      <Button disabled={this.state.loading}>
      <Icon type={this.state.loading ? 'loading' : 'upload'} /> 上传视频
    </Button>
    );
    const formData = { type: 2 }
    return (
      <Upload
        name="filename"
        // listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.state.uploadUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        data={formData}
      >
        {this.state.imageUrl? (
         <video src={"/api"+this.state.imageUrl}  controls style={{maxWidth:"250px"}} id="start" >
        
         </video>
        ) : (
            uploadButton
          )}
        {this.state.percent !== 0 && <Progress percent={parseInt(""+this.state.percent)} status={this.state.status? "active" : "exception"} />}
      </Upload>
    );
  }
}
