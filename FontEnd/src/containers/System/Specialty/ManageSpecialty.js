import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../utils/CommonUtils';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameSpecialty: '',
            imageBase94: '',
            descriptionHTML: '',
            descriptionMardown: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        console.log("copy state: ", copyState)
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files
        // console.log("data: ", data)
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log("test base64: ", base64)
            // let objectUrl = URL.createObjectURL(file)
            this.setState({
                // previewImgULR: objectUrl,
                imageBase94: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMardown: text
        })
    }


    // handleOnchangeImage = async (event) => {
    //     let data = event.target.files
    //     let file = data[0]
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file)
    //         // console.log("test base64: ", base64)
    //         let objectUrl = URL.createObjectURL(file)
    //         this.setState({
    //             previewImgULR: objectUrl,
    //             avatar: base64
    //         })
    //     }
    // }

    render() {
        console.log("this.state: ", this.state)
        return (
            <React.Fragment>
                <div className="manage-specialty-container">
                    <div className="ms-title" >Quản lý chuyên khoa</div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>Tên chuyên khoa</label>
                            <
                                input className="form-control" type="text"
                                value={this.state.nameSpecialty}
                                onChange={(event) => this.handleOnChangeInput(event, 'nameSpecialty')}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh chuyên khoa</label>
                            <input className="form-control-file" type="file"
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMardown}
                            />
                        </div>
                        <div className='btn-save-specialty col-12'>
                            <button className='btn-save-specialty'>Save</button>
                        </div>
                    </div>
                </div >
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);


