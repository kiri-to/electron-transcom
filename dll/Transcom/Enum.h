#pragma once
#include <stdint.h>

struct NvmeTable
{
	uint32_t timestamp;			//	���̿�ʼ��ʱ��   ע: ��ʱ�����2000��Ϊʱ��Ԫ��
	uint32_t Startblock;		//	��ʼ block
	uint32_t Needblock;			//	�ܹ���Ҫ��block
	uint32_t Centerfrquency_low;	//	����Ƶ���λ
	uint32_t Centerfrquency_high;	//	����Ƶ���λ
	uint32_t Span;				//	����
	wchar_t Name[32];					//	�ļ���
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
