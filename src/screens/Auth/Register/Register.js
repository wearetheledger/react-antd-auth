import { Form } from 'antd';
import React from 'react';
import * as bip39 from 'bip39';
import AuthRegister from '../../../components/Auth/Register';
import { connect } from 'react-redux';
import { register } from '../../../shared/auth/authActions';

class ScreensAuthRegister extends React.PureComponent {
    generatePassPhrase = () => {
        this.props.form.setFieldsValue({
            passphrase: bip39.generateMnemonic()
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values.passphrase);
            }
        });
    };

    render() {
        const { form: { getFieldDecorator }, error, loading } = this.props;

        return (
            <AuthRegister
                error={error}
                loading={loading}
                getFieldDecorator={getFieldDecorator}
                generatePassPhrase={this.generatePassPhrase}
                handleSubmit={this.handleSubmit}
                initialValue={bip39.generateMnemonic()}
            />
        );
    }
}

const mapStateToProps = state => ({
    error: state.auth.message.register,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { register })(
    Form.create()(ScreensAuthRegister)
);
