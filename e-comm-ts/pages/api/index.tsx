import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../utils/database';
import {
  FormattedFormData,
  FormValues,
  FormattedFormDataStrict,
  ResponceAPI,
} from '../../types';
import * as Yup from 'yup';

import fs from 'fs';

export const config = {
  api: {
    bodyParse: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { action, values },
  } = req;

  const { db } = await connectToDatabase();
};

export default handler;
