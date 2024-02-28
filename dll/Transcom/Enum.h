#pragma once
#include <stdint.h>

struct NvmeTable
{
	uint32_t timestamp;			//	流盘开始的时间   注: 此时间戳以2000年为时间元年
	uint32_t Startblock;		//	起始 block
	uint32_t Needblock;			//	总共需要的block
	uint32_t Centerfrquency_low;	//	中心频点低位
	uint32_t Centerfrquency_high;	//	中心频点高位
	uint32_t Span;				//	带宽
	wchar_t Name[32];					//	文件名
};
typedef NvmeTable* NvmeTablePtr;

enum class DetectorType
{
	PositivePeak = 0,
	NegativePeak = 1,
	Average = 2,
	Sample = 3
};

enum class TriggerSource
{
	FreeRun = 0,
	EXTernal = 1,
	MASK = 2,
	TDTR = 3,
	AMP = 4,
	TDTRPULSE = 5,
	AMPPULSE=6
};

enum class TriggerMode
{
	StopOnTrigger = 0,
	AutoRearm = 1,
};

enum class StreamTriggerOperation
{
	Forward = 0,
	Backward = 1
};
