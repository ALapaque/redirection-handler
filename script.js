async function getPaymentRedirectionUrl(storefrontId, storefrontStoreId, paymentStatus) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${url}/api/v8/ClickAndCollect/Payment/ReturnUrl/${storefrontId}/${storefrontStoreId}/${paymentStatus}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    redirect(result.returnUrl)
  } catch (error) {
    console.error(error.message);
  }
}

function redirect(redirectTo) {
  // Redirect to the specified URL
  window.location.href = decodeURIComponent(redirectTo);
}


window.onload = function () {
  // Get the parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const redirectTo = params.get('redirectTo');
  const storeId = params.get('storeId');
  const storefrontId = params.get('storefrontId');
  const paymentStatusType = params.get('status');

  const _handleRedirectToParameter = () => {
    redirect(redirectTo);
  }

  const _handleRedirectAfterPayment = () => {
    void getPaymentRedirectionUrl(storeId, storefrontId, paymentStatusType)
  }

  if (redirectTo) {
    _handleRedirectToParameter();
  } else if (storeId && storefrontId && paymentStatusType) {
    _handleRedirectAfterPayment()
  } else {
    console.log('No parameter matching any case provided');
  }
};