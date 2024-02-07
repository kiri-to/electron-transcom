main: native.cpp
	cl.exe  native.cpp /link /dll /libpath liquid\liquid.lib  /out:native.dll

cleanObj = *.obj *.exp *.lib 
clean:
	-rm $(cleanObj)