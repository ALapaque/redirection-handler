const H3_CONTAINER_TEXT_ID = 'text__container';
const SPINNER_ID = 'spinner';

async function getPaymentRedirectionUrl(fallbackTo, storefrontId, storefrontStoreId, paymentStatus, paymentReference) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(
      `${url}/api/v8/ClickAndCollect/Payment/ReturnUrl/${storefrontId}/${storefrontStoreId}/${paymentStatus}?paymentReference=${paymentReference}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    redirect(result.returnUrl, fallbackTo);
  } catch (error) {
    console.error('Error fetching payment redirection URL:', error.message);
  }
}

function isMobileBrowser() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS|Windows Phone|Kindle|Silk-Accelerated|Mobile|Tablet|Opera Mobi|Opera Tablet|Fennec/i.test(navigator.userAgent);
}

function handleWebshopIsNotActivated() {
  document.getElementById(H3_CONTAINER_TEXT_ID).textContent = 'This link must be open on your mobile!';
  document.getElementById(H3_CONTAINER_TEXT_ID).style.color = 'red';
  document.getElementById(SPINNER_ID).style.display = 'none';
}

function handleWindowError(redirectTo, fallbackTo) {
  // This means the redirectTo and the fallbackTo is to a mobile app, that means the webshop is not active
  if (
    (!redirectTo.includes('http://') && !redirectTo.includes('https://')) &&
    (!fallbackTo.includes('http://') && !fallbackTo.includes('https://')) &&
    !isMobileBrowser()
  ) {
    return handleWebshopIsNotActivated()
  }


  setTimeout(() => {
    window.open(decodeURIComponent(fallbackTo), '_self')
  }, 5000)
}

function redirect(redirectTo, fallbackTo) {
  window.location.href = decodeURIComponent(redirectTo)

  if (!!fallbackTo) {
    window.onError = handleWindowError(redirectTo, fallbackTo)
  }
}


window.onload = function () {
  // Get the parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const redirectTo = params.get('redirectTo');
  const fallbackTo = params.get('fallbackTo');
  const storeId = params.get('storeId');
  const storefrontId = params.get('storefrontId');
  const paymentStatusType = params.get('status');
  const paymentReference = params.get('s');

  const _handleRedirectToParameter = () => {
    redirect(redirectTo, fallbackTo);
  };

  const _handleRedirectAfterPayment = () => {
    void getPaymentRedirectionUrl(fallbackTo, storeId, storefrontId, paymentStatusType, paymentReference);
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
