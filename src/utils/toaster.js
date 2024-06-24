export const TOASTER_TYPE = {
    ERROR: 'error',
    SUCCESS: 'success'
  };
  

export const showToaster = (
    type,
    message,
    description,
    duration = 5,
    placement = 'topRight',
    toasterClick = () => {}
  ) => {
    const baseStyle = {
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      padding: '16px 24px',
      maxWidth: 400
    };
  
    const successStyle = {
      ...baseStyle,
      backgroundColor: '#f6ffed',
      borderColor: '#b7eb8f',
      color: '#389e0d'
    };
  
    const errorStyle = {
      ...baseStyle,
      backgroundColor: '#fff1f0',
      borderColor: '#ffa39e',
      color: '#a8071a'
    };
  };