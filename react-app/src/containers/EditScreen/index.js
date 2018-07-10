import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'containers/BaseScreen';
import DatePicker from 'components/DatePicker';
import Header from 'components/Header';
import TextArea from 'components/TextArea';

export default class EditScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The date to show
     */
    date: PropTypes.string.isRequired,

    /**
     * The text to show
     */
    text: PropTypes.string.isRequired,

    /**
     * The function to call when back button is tapped
     */
    onBack: PropTypes.func.isRequired,

    /**
     * The function to call when save button is tapped
     */
    onSave: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._textArea.focus();
  }

  _setDatePickerRef = element => this._datePicker = element;
  _setTextAreaRef = element => this._textArea = element;

  _handleBack = () => {
    const text = this._textArea.getText();
    const date = this._datePicker.getDate();

    this.props.onBack(date, text);
  }

  _handleSave = () => {
    const text = this._textArea.getText();
    const date = this._datePicker.getDate();

    this.props.onSave(date, text);
  }

  _getHeader() {
    const backIcon = <ActionIcon
      icon={ActionIcon.BACK}
      onClick={this._handleBack}
    />;

    const applyIcon = <ActionIcon
      icon={ActionIcon.APPLY}
      onClick={this._handleSave}
    />;

    return <Header
      left={backIcon}
      right={applyIcon}
    />;
  }

  _getDatePicker() {
    return <DatePicker
      date={this.props.date}
      ref={this._setDatePickerRef}
    />;
  }

  _getTextArea() {
    return <TextArea
      text={this.props.text}
      ref={this._setTextAreaRef}
    />;
  }

  _getMainContent() {
    const datePicker = this._getDatePicker();
    const textArea = this._getTextArea();

    return (
      <div>
        <div>
          {datePicker}
        </div>
        <div>
          {textArea}
        </div>
      </div>
    );
  }

  render() {
    const header = this._getHeader();
    const main = this._getMainContent();

    return <BaseScreen
      header={header}
      main={main}
    />;
  }
}