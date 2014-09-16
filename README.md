### NodeWebkit Angular Boilerplate

## Usage

To initialize your app, type the following commands in your terminal:

```
npm i
bower install
grunt init --name=theNameYouWant --author="your name <you@email.com>"
```
> NOTE: Double quotes are important in the `author` parameter.

You can now see your app in your browser by typing:
```bash
grunt
```
Or in nodewebkit:
```bash
grunt nw
```
> NOTE: Don't forget to change the `nodewebkit` task according to your platform.

### Troubleshooting

#### Linux:
If you get an error like `nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory` you can simply type
```bash
$ sed -i 's/udev\.so\.0/udev.so.1/g' resources/node-webkit/Linux*/nw
```
You can [see here](https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0) for explanations.