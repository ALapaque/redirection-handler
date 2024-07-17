async function getPaymentRedirectionUrl(fallbackTo, storefrontId, storefrontStoreId, paymentStatus) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${url}/api/v8/ClickAndCollect/Payment/ReturnUrl/${storefrontId}/${storefrontStoreId}/${paymentStatus}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    redirect(result.returnUrl, fallbackTo);
  } catch (error) {
    console.error('Error fetching payment redirection URL:', error.message);
  }
}

function handleWindowError() {
  alert('The specified url was not found');
}

function redirect(redirectTo, fallbackTo) {
  window.location.href = decodeURIComponent(redirectTo)
  //window.onError = window.open(decodeURIComponent(fallbackTo), '_self')
}


window.onload = function () {
  // Get the parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const redirectTo = params.get('redirectTo');
  const fallbackTo = params.get('fallbackTo');
  const storeId = params.get('storeId');
  const storefrontId = params.get('storefrontId');
  const paymentStatusType = params.get('status');

  const _handleRedirectToParameter = () => {
    redirect(redirectTo, fallbackTo);
  };

  const _handleRedirectAfterPayment = () => {
    void getPaymentRedirectionUrl(fallbackTo, storeId, storefrontId, paymentStatusType);
  };

  if (redirectTo) {
    _handleRedirectToParameter();
  } else if (storeId && storefrontId && paymentStatusType) {
    _handleRedirectAfterPayment();
  } else {
    console.log('No parameter matching any case provided');
  }
};

window.onerror = handleWindowError
