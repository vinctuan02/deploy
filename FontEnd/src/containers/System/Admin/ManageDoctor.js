import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { CRUD_ACTION, LANGUAGES } from '../../../utils/constant';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: '',
            hasOldData: false,

            //save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        // console.log("dit mount")
        this.props.fetchAllDoctorsRedux()
        this.props.getRequiredDoctorInfor()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("did update")
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            // let dataSelectPrice = this.buildDataInput(this.props.allRequiredDoctorInfor)
            let dataPriceSelect = this.buildDataInput(resPrice, 'PRICE')
            let dataPaymentSelect = this.buildDataInput(resPayment, 'PAYMENT')
            let dataProvinceSelect = this.buildDataInput(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataPriceSelect,
                listPayment: dataPaymentSelect,
                listProvince: dataProvinceSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            // console.log('this.props.allRequiredDoctorInfor didUpdate: ', this.props.allRequiredDoctorInfor)
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            // let dataSelectPrice = this.buildDataInput(this.props.allRequiredDoctorInfor)
            let dataPriceSelect = this.buildDataInput(resPrice, 'PRICE')
            let dataPaymentSelect = this.buildDataInput(resPayment, 'PAYMENT')
            let dataProvinceSelect = this.buildDataInput(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataPriceSelect,
                listPayment: dataPaymentSelect,
                listProvince: dataProvinceSelect
            })
            // console.log("hi: ", dataPaymentSelect, dataPriceSelect, dataProvinceSelect)
        }
    }

    buildDataInput = (dataInput, type) => {
        let result = []
        let { language } = this.props
        if (type === 'USERS') {
            dataInput.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
                // return 0
            })
        }
        if (type === 'PRICE') {
            dataInput.map((item, index) => {
                // console.log("item: ", item)
                let object = {}
                let labelVi = `${item.valueVi}`
                let labelEn = `${item.valueEn} USD`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.keyMap
                // console.log("object: ", object)
                result.push(object)
                // return 0
            })
        }

        if (type === 'PAYMENT' || type === 'PROVINCE') {
            dataInput.map((item, index) => {
                // console.log("item: ", item)
                let object = {}
                let labelVi = `${item.valueVi}`
                let labelEn = `${item.valueEn}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.keyMap
                // console.log("object: ", object)
                result.push(object)
                // return 0
            })
        }
        return result
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        // console.log('this.state: ', this.state)
        let { hasOldData } = this.state
        this.props.saveDetailInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            // specialtyId: this.state.specialtyId
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })

        this.setState({
            // contentMarkdown: '',
            // contentHTML: '',
            // selectedDoctor: '',
            // description: '',
            // listDoctors: '',
            hasOldData: false
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        // console.log("list state: ", this.state)
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state

        let res = await getDetailInforDoctor(selectedDoctor.value)
        // console.log("test res: ", res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown &&
            res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown &&
            res.data.Markdown.description) {

            let markdown = res.data.Markdown

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = ''
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                priceId = res.data.Doctor_Infor.priceId
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                provinceId = res.data.Doctor_Infor.provinceId
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                // console.log("price :", priceId, listPrice)
                // console.log("payment :", paymentId, listPayment)
                // console.log("province :", provinceId, listProvince)
            }

            // let Doctor_Infor = res.data.Doctor_Infor
            // console.log("Test: ", Doctor_Infor)
            // console.log("List price: ", this.state.listPrice)

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
        // console.log(`Option selected:`, selectedDoctor);
    };

    handleChangeSelectDoctorInfor = (selectOption, name) => {
        // console.log("selectOption: ", selectOption)
        // console.log("name: ", name)
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectOption
        // console.log("stateCopy: ", stateCopy)
        this.setState({
            ...stateCopy
        })
        // console.log("this.state: ", this.state)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData } = this.state
        // console.log("this.state render(): ", this.state)
        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id={'admin.manage-doctor.title'} />
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>
                                <FormattedMessage id={'admin.manage-doctor.select-doctor'} />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right'>
                            <lable><FormattedMessage id={'admin.manage-doctor.intro'} /></lable>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}>
                            </textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id={'admin.manage-doctor.price'} />
                            </label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                name='selectedPrice'
                                placeholder={'Giá khám'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id={'admin.manage-doctor.payment'} />
                            </label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                name='selectedPayment'
                                placeholder={'Phương thức thanh toán'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id={'admin.manage-doctor.province'} />
                            </label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                name='selectedProvince'
                                placeholder={'Tỉnh thành'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.nameClinic'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.addressClinic'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id={'admin.manage-doctor.note'} />
                            </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                    <button
                        className={hasOldData ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {
                            hasOldData ? <span>Lưu thông tin</span> : <span>
                                <FormattedMessage id={'admin.manage-doctor.save'}/>
                            </span>
                        }
                    </button>
                    {/* <button className='save-content-doctor'
                        onClick={() => this.test()}
                    >
                        Test
                    </button> */}
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(action.fetchAllDoctor()),
        getRequiredDoctorInfor: () => dispatch(action.getRequiredDoctorInfor()),
        saveDetailInforDoctor: (data) => dispatch(action.saveDetailUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
