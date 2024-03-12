enum ErrorReferenceConstants {
  NETWORK_ERROR = 'Network Error',
  ECONNREFUSED = 'ECONNREFUSED',
  ERR_EMPTY_RESPONSE = 'ERR_EMPTY_RESPONSE',
  ERR_NAME_NOT_RESOLVED = 'ERR_NAME_NOT_RESOLVED',
  DNS_PROBE_FINISHED_NO_INTERNET = 'DNS_PROBE_FINISHED_NO_INTERNET',
}

// done in this way bcz in future multi language feature will be supported

enum ErrorMessageConstants {
  OOPS_SOMETHING_WENT_WRONG = 'errors.somethingWentWrong',
  COULD_NOT_LOAD_DETAILS = 'errors.couldNotLoad',
  COULD_NOT_CONNECT = 'errors.couldNotConnect',
  DONT_KNOW_WHAT_HAPPENED = 'errors.dontKnowWhatHappened',
  COMMON_MESSAGE = 'errors.commonMessage',
}

const CommonErrorMessages: string[] = [
  ErrorMessageConstants.COMMON_MESSAGE,
  ErrorMessageConstants.COULD_NOT_LOAD_DETAILS,
  ErrorMessageConstants.DONT_KNOW_WHAT_HAPPENED,
];

export { ErrorReferenceConstants, ErrorMessageConstants, CommonErrorMessages };
