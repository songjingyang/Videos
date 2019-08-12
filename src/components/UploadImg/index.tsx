import React from 'react';
import urlMaps from '../../common/urlMaps'
import { Upload, Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { type } from 'os';
interface Props {
  pos: any
  type: any
  // value?: string;
  // label?: string;
  getImgUrl: any
  // onChange?(url: string): void;
  // getImgUrl?(formData: any): string | Promise<any>;
}
interface State {
  loading: boolean;
  imageUrl: string;
  file: any;
  uploadUrl: string
}
export default class UploadImg extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      uploadUrl: urlMaps.commonUpload,
      loading: false,
      imageUrl: "",
      file: {

      },
    };
  }
  componentWillReceiveProps(nextProps: any) {
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
    // if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
    //   const suffix = "." + file.name.replace(/^.+\./, '')
    //   const filename = file.name.replace(suffix, "")
    //   var img_url = window.URL.createObjectURL(file);
    //   var img = new Image();
    //   img.src = img_url
    //   img.onload = function (e) {
    //     // 打印
    //     var ww = img.width
    //     var hh = img.height
    //     var timestamp = new Date().getTime()
    //     const fileSize = ww + "*" + hh
    //     const key = timestamp + filename + "_" + fileSize + "_" + suffix
    //   }
    // }
    // const NotChosen = this.props.type === "" || this.props.pos === ""
    // // const isDashed = 
    // const isGIF = file.type === "image/gif" && this.props.type === 1 && this.props.pos === 8
    // const isPass = this.props.pos === 10 && this.props.type === 10
    // if (NotChosen) {
    //   message.error("请确认是否选择了广告位置和广告图片类型！")
    // }
    // if (isGIF) {
    //   message.error("请上传非gif格式图片！")
    // }
    // if (isPass || !NotChosen || !isPass) {
    //   return true
    // }
    // return NotChosen && isGIF
    return true
  };

  handleChange = (file: any) => {
    if (file.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (file.file.status === 'done') {
      if (file.file.response.code == 200) {
        const imgUrl = file.file.response.data.url;
        console.log("imgUrl", file)
        // const baseUrl =
        //   window.location.protocol + '//' + document.domain+":"+window.location.port + '/api';
        this.setState(
          {
            imageUrl: imgUrl,
            loading: false,

          },
          () => {
            this.props.getImgUrl(this.state.imageUrl);
          }
        );
      } else {
        message.error(file.file.response.msg)
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
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const baseUrl =
      window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api';
    const formData = { type: 1 }
    return (
      <Upload
        {...this.props}
        name="filename"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.state.uploadUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        data={formData}
      >
        {this.state.imageUrl ? (
          <img
            src={"/api" + this.state.imageUrl}
            alt="avatar"
            style={{ maxHeight: '150px' }}
          />
        ) : (
            uploadButton
          )}
      </Upload>
    );
  }
}
