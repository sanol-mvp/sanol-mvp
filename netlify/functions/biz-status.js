// 국세청 사업자등록 상태조회 API 프록시
const NTS_API_KEY = 'cb985540120b1834082763b7c3edce52640fbd2652ddee66b411360c4298fc42';

exports.handler = async (event) => {
    // POST만 허용
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { b_no } = JSON.parse(event.body);

        if (!b_no || !Array.isArray(b_no) || b_no.length === 0) {
            return { statusCode: 400, body: JSON.stringify({ error: '사업자등록번호를 입력해주세요' }) };
        }

        const response = await fetch(
            `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${NTS_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ b_no })
            }
        );

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: '서버 오류: ' + error.message })
        };
    }
};
