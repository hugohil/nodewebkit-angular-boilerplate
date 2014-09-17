### NodeWebkit Angular Boilerplate

## Usage

To initialize your app, type the following commands in your terminal:

```bash
$ npm i
$ bower install
$ grunt init --platform=linux64 --name=nameForYourApp --author="your name <you@email.com>"
```
> NOTE: Double quotes are important in the `author` parameter.

For the `platform` parameter, you can either type `win`, `osx`, `linux32` or `linux64`, but you only should put one, i.e your development one. When you are done and wish to compile for every platform, simply change the `var platform` default value in the `Gruntfile.js` for all the os you want to support (and there you can of course write an array).


You can now see your app in your browser by typing:
```bash
$ grunt
```
Or in nodewebkit:
```bash
$ grunt nw
```

### Troubleshooting

#### Linux:
If you get an error like `nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory` you can simply type
```bash
$ sed -i 's/udev\.so\.0/udev.so.1/g' cache/**/linux*/nw
```
You can [see here](https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for explanations.

Also note that Debian stable version doesn't support node webkit, you have to go unstable.
