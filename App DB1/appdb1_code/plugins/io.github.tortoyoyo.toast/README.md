# io.github.tortoyoyo.toast

## Download Cordova - CordovaCli

* cordova plugin add io.github.tortoyoyo.toast

## Plugman 

`$ plugman install --platform android --project /home/project/platforms/android/ --plugin /home/plugins/io.github.tortoyoyo.toast/ --plugins_dir /home/project/plugins/`

`$ plugman install --platform firefoxos --project /home/project/platforms/firefoxos/ --plugin /home/plugins/io.github.tortoyoyo.toast/ --plugins_dir /home/project/plugins/`

## Methods

### show()

Create a Toast

```javascript
navigator.toast.show(message, onSucess, onError, options);
```

- **message:** Message (String)
- **options:**
 - duration: duration toast, 1-LONG / 0-SHORT - Values: 0 or 1 (int) (default: 0)
 - **onSuccess:** function success
 - parameter: message thats ok. (string)
- **onError:** function error

#### Example

```javascript
function onSuccess(success) {
    console.log('Success: ' + success);
}

function onError(error) {
    console.log('Error:' error);
}

navigator.toast.show('FirefoxOS and Android toast!', onSuccess, onError, {
    duration: 1
});
```
