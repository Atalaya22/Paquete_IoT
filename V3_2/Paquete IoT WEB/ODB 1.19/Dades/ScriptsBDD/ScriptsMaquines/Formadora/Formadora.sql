/****** Object:  Table [dbo].[Formadora]    Script Date: 30/04/2020 11:01:04 ******/
CREATE TABLE [dbo].[Formadora](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Duracio] [time](7) NOT NULL,
	[Final] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[Magatzem] [tinyint] NOT NULL,
	[CaixaId] [smallint] NOT NULL,
	[ProducteId_1] [smallint] NOT NULL,
	[ProducteId_2] [smallint] NULL,
	[ProducteId_3] [smallint] NULL,
	[ProducteId_4] [smallint] NULL,
	[CaixesTotals] [int] NOT NULL,
	[CaixesTotals_1] [int] NOT NULL,
	[CaixesTotals_2] [int] NULL,
	[CaixesTotals_3] [int] NULL,
	[CaixesTotals_4] [int] NULL,
 CONSTRAINT [PK_Formadora] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Temp_Formadora]    Script Date: 30/04/2020 11:01:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_Formadora](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[Magatzem] [tinyint] NOT NULL,
	[CaixaId] [smallint] NOT NULL,
	[ProducteId_1] [smallint] NOT NULL,
	[ProducteId_2] [smallint] NULL,
	[ProducteId_3] [smallint] NULL,
	[ProducteId_4] [smallint] NULL,
	[CaixesTotals] [int] NOT NULL,
	[CaixesTotals_1] [int] NOT NULL,
	[CaixesTotals_2] [int] NULL,
	[CaixesTotals_3] [int] NULL,
	[CaixesTotals_4] [int] NULL,
 CONSTRAINT [PK_Temp_Formadora] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Formadora_Cadencies]    Script Date: 30/04/2020 11:01:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formadora_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[CadenciaInstantania] [float] NOT NULL,
	[CadenciaMitja] [float] NOT NULL,
 CONSTRAINT [PK_Formadora_Cadencia] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Formadora_Productes]    Script Date: 30/04/2020 11:01:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Formadora_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Color] [varchar](max) NULL,
	[Inici] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
