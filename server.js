import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";
import { getParamsToQuery } from "./common.js";

const typeDefs = gql`
  type Query {
    getDatas: Result
  }

  type Result {
    resultCode: String
    resultMsg: String
    numOfRows: Int
    pageNo: Int
    totalCount: Int
    num: Int
    sgId: Int
    erVotingDiv: Int
    sdName: String
    wiwName: String
    votersCnt: Int
    erVotingCnt: Int
    erTurnout: Float
    sortOrd: Int!
  }
`;

const resolvers = {
  Query: {
    async getDatas(params) {
      params = {
        ServiceKey:
          "vW5NqPdVP3v8Xyv9Rqfc3RpZxaUPuY33V3A8dBrzDC9w3EaiVDtjQv/U8YwN0uZKFwx72DiKYYlS3Vqc9p9snQ==", // 공공데이터 포털에서 받은 인증키
        pageNo: 1, // 페이지 번호
        numOfRows: 10, // 한 페이지 결과 수
        sgId: 20230405, // 선거 ID
        erVotingDiv: 0, // 사전투표 구분 일차 (0 = 전체, 1 = 1일차, 2 = 2일차)
        sdName: "부천시", // 시도 명
        wiwName: "원미구", // 위원회 명
      };
      return fetch(
        `http://apis.data.go.kr/9760000/ErVotingSttusInfoInqireService${getParamsToQuery(
          params
        )}`
      )
        .then((response) => response.json())
        .then((json) => json.data.movies);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
