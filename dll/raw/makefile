main: raw.cpp
	cl.exe  raw.cpp /link /dll /libpath ..\liquid\liquid.lib  /out:raw.dll

cleanObj = *.obj *.exp *.lib 
clean:
	-rm $(cleanObj)